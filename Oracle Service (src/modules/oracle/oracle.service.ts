import { Injectable } from '@nestjs/common';
import * as axios from 'axios';
import * as tensorflow from '@tensorflow/tfjs-node';

@Injectable()
export class OracleService {
  private aiModel: tensorflow.LayersModel;

  constructor() {
    this.loadAIModel();
  }

  async loadAIModel() {
    // Load pre-trained AI model
    this.aiModel = await tensorflow.loadLayersModel('file://ai/model.json');
  }

  async validateData(inputData: any): Promise<boolean> {
    // Validate incoming data using AI model
    const inputTensor = tensorflow.tensor(inputData);
    const prediction = this.aiModel.predict(inputTensor) as tensorflow.Tensor;
    const result = prediction.dataSync()[0];

    return result > 0.5;  // If prediction > 0.5, considered valid
  }

  async fetchDataFromAPI(apiUrl: string): Promise<any> {
    try {
      const response = await axios.default.get(apiUrl);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching data from external API');
    }
  }

  async getValidatedData(apiUrl: string): Promise<any> {
    const rawData = await this.fetchDataFromAPI(apiUrl);
    const isValid = await this.validateData(rawData);
    return { data: rawData, isValid };
  }
}
