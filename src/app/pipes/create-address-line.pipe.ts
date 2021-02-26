import { Pipe, PipeTransform } from "@angular/core";
import { AddressModel } from "../types/address.model";

@Pipe({
    name: 'pipeCreateAddressLine'
})
export class PipeCreateAddressLine implements PipeTransform {
    count = 0;
    transform(address: AddressModel): string {
        return `${address.city}, ${address.street}, ${address.suite}`;
    }
}