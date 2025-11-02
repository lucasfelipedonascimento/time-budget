import { ClientRepository } from "../../../../infra/database/repositories/ClientRepository";
import { VehicleRepository } from "../../../../infra/database/repositories/VehicleRepository";
import { ServiceRepository } from "../../../../infra/database/repositories/ServiceRepository";
import { PieceRepository } from "../../../../infra/database/repositories/PieceRepository";
import { BudgetRepository } from "../../../../infra/database/repositories/BudgetRepository";
import { BudgetDTO } from "../../../../dto/BudgetDTO";
import { Piece } from "../../../support/pieces/domain/entitie/Piece";
import { Service } from "../../../support/services/domain/entitie/Service";
import { Status } from "../../../../value-objects/Status";

export class CreateBudgetUseCase {
  private clientRepository: ClientRepository;
  private vehicleRepository: VehicleRepository;
  private serviceRepository: ServiceRepository;
  private pieceRepository: PieceRepository;
  private budgetRepository: BudgetRepository;

  constructor() {
    // repositório de cliente
    this.clientRepository = new ClientRepository();
    // repositório de veículo
    this.vehicleRepository = new VehicleRepository();
    // repositório de serviço
    this.serviceRepository = new ServiceRepository();
    // repositório de peça
    this.pieceRepository = new PieceRepository();
    // repositório de orçamento
    this.budgetRepository = new BudgetRepository();
  }

  async execute(budgetDto: BudgetDTO) {
    // Verifica se o cliente existe
    const client = await this.clientRepository.findById(budgetDto.client_id);
    if (!client) throw new Error("Cliente não encontrado");

    // Verifica se o veículo existe
    const vehicle = await this.vehicleRepository.findById(budgetDto.vehicle_id);
    if (!vehicle) throw new Error("Veículo não encontrado");

    // verifica se as peças existem
    const pieces: Piece[] = [];
    budgetDto.pieces?.map(async (piece) => {
      const pieceExists = await this.pieceRepository.findById(piece.id);
      if (!pieceExists) {
        throw new Error(
          `A peça de id ${piece.id} e nome ${piece.name} não foi encontrada`
        );
      }

      pieces.push(
        new Piece(
          pieceExists.name,
          piece.unit_price,
          piece.quantity,
          pieceExists.id
        )
      );
    });

    // verifica se os serviços existem
    const services: Service[] = [];
    const piecesInServices: Piece[] = [];
    budgetDto.services?.map(async (service) => {
      const serviceExists = await this.serviceRepository.findById(service.id);
      if (!serviceExists) {
        throw new Error(
          `O serviço de id ${service.id} e nome ${service.name} não foi encontrado`
        );
      }

      // verificar se peça do serviço existe
      service.pieces?.map(async (piece) => {
        const pieceExists = await this.pieceRepository.findById(piece.id);
        if (!pieceExists) {
          throw new Error(
            `A peça de id ${piece.id} e nome ${piece.name} não foi encontrada`
          );
        }

        piecesInServices.push(
          new Piece(
            pieceExists.name,
            piece.unit_price,
            piece.quantity,
            pieceExists.id
          )
        );
      });

      services.push(
        new Service(
          serviceExists.name,
          Number(service.time),
          service.unit_price,
          service.quantity,
          piecesInServices,
          serviceExists.id
        )
      );
    });

    // criar o orçamento
    const newBudget = await this.budgetRepository.create({
      client_id: client.id!,
      vehicle_id: vehicle.id!,
      status: "pending",
      total_value: budgetDto.total_value,
    });
  }
}
