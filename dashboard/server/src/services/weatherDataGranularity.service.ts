import { Injectable } from '@nestjs/common';
import { WeatherDataDto } from './dto/weatherData.dto';
import { WeatherDataIndexer } from './weatherDataIndexer.service';
import { WeatherDataIterator } from './weatherDataIterator.service';

@Injectable()
export class WeatherDataGranularityService {
    transformByGranularity(
        data: WeatherDataDto[],
        dateFrom: Date,
        dateTo: Date,
        granularitySeconds: number
    ): WeatherDataDto[] {
        // Expect sorted data by timestamp
        const dateFromMillis = dateFrom.getTime();
        const dateToMillis = dateTo.getTime();

        const numberOfItems = this.#calculateNumberOfItemsInTimeFrame(
            dateFromMillis,
            dateToMillis,
            granularitySeconds * 1000
        );

        const ratio = Math.floor(data.length / numberOfItems);
        const result = this.#generateDummyData(numberOfItems, dateFromMillis, granularitySeconds * 1000);
        for (let i = 0; i < numberOfItems; i++) {
            const timestamp = result[i].timestamp;
            result[i] = this.#calculateGranularityBetween(timestamp, this.#getRelatedData(timestamp, data, ratio));
        }

        return result;
    }

    #getRelatedData(timestamp: Date, data: WeatherDataDto[], ratio: number): WeatherDataDto[] {
        const indexer = new WeatherDataIndexer();
        const [lowerIndex, upperIndex] = indexer.findIndex(timestamp, data, 0, data.length);

        const iterator = new WeatherDataIterator(data, lowerIndex, upperIndex, ratio);
        return [...iterator.takePreviousFor(timestamp), ...iterator.takeNextFor(timestamp)];
    }

    #generateDummyData(length: number, dateFromMillis: number, granularityMillis: number): WeatherDataDto[] {
        const calculateTimestamp = (itemNumber) => new Date(dateFromMillis + itemNumber * granularityMillis);

        return Array.from({ length }, (_, i) => ({
            timestamp: calculateTimestamp(i),
            humidity: 0,
            temperature: 0,
        }));
    }

    #calculateNumberOfItemsInTimeFrame(millisFrom: number, millisTo: number, granularityMillis) {
        if (millisFrom > millisTo) {
            throw new Error(`Invalid values - from: ${millisFrom}, to: ${millisTo}`);
        }

        return Math.ceil((millisTo - millisFrom) / granularityMillis) + 1;
    }

    #calculateGranularityBetween(timestamp: Date, data: WeatherDataDto[]): WeatherDataDto {
        return {
            temperature: this.#granularityFunction(data.map((x) => x.temperature)),
            humidity: this.#granularityFunction(data.map((x) => x.humidity)),
            timestamp,
        };
    }

    #granularityFunction(numbers: number[]) {
        if (numbers.length === 0) {
            return 0;
        }

        return numbers.reduce((a, b) => a + b) / numbers.length;
    }
}
