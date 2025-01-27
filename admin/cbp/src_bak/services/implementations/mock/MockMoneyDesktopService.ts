import { BaseMockService } from './BaseMockService';
import { IMoneyDesktopService } from '../../interfaces/IMoneyDesktopService';
import { Account, Connection, MoneyDesktopFilters } from '../../types/money-desktop.types';
import { mockConnections, mockAccounts } from './data/money-desktop/mockMoneyDesktopData';

export class MockMoneyDesktopService extends BaseMockService implements IMoneyDesktopService {
  private connections: Connection[] = [...mockConnections];
  private accounts: Account[] = [...mockAccounts];

  constructor(basePath: string) {
    super(basePath);
  }

  async getConnections(filters: MoneyDesktopFilters): Promise<Connection[]> {
    await this.delay();

    let filteredConnections = [...this.connections];

    // Apply filters






    // Apply filters
      );

      );

      );

      );




    // Apply filters
      );

      );

      );

      );


    

    // Update connection sync time and clear any errors

    // Update associated accounts
      .filter(acc => acc.connectionId === connectionId)
      .forEach(acc => {



    
    
      ...rows.map(row => row.join(','))
    ].join('\n');
