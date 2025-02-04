import { Controller, Get } from '@nestjs/common';
import { OracleService } from './oracle.service';

@Controller('oracle')
export class OracleController {
  constructor(private readonly oracleService: OracleService) {}

  @Get('validate')
  async validateOracleData() {
    const apiUrl = 'https://api.example.com/data'; // Replace with actual API URL
    const result = await this.oracleService.getValidatedData(apiUrl);
    return result;
  }
}
