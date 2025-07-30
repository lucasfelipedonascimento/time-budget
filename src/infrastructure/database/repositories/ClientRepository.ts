import { TABLE } from '../../../constants/Table';
import { IClientRepository } from '../../../contexts/basic/domain/interfaces/IClientRepository'
import { Client as PgClient } from 'pg'
import { ClientDTO } from '../../../contexts/basic/domain/dto/Client'

export class ClientRepository implements IClientRepository {
  private client: PgClient;

  constructor(client: PgClient) {
    this.client = client;
  }

  async findById(id: number): Promise<ClientDTO | null> {
    const result = await this.client.query(`SELECT * FROM ${TABLE.clients} WHERE id = $1`, [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }
}