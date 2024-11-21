import { LightningElement, api, track, wire } from 'lwc';
import getProperty from "@salesforce/apex/PropertHandler_LWC.getProperty";
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class MyFirstComponent extends LightningElement {
    @api recordId;
    userId = USER_ID;
    verifiedVar;  // Correctly renamed to camelCase
    typeVar;  // Correctly renamed to camelCase
    isFalse = true;  // Correctly renamed to camelCase
    isTrue = false;  // Correctly renamed to camelCase

    @track propertyList = [];  // Correctly renamed to camelCase
    columns = [
        { label: 'Property Name', fieldName: 'Property_Name__c' },
        { label: 'Property Type', fieldName: 'Type__c' },
        { label: 'Property Location', fieldName: 'Location__c' },
        { label: "Property Link", fieldName: "Property_link__c" }
    ];

    propertyOptions = [  // Correctly renamed to camelCase
        { label: "Commercial", value: "Commercial" },
        { label: "Residential", value: "Residential" },
        { label: "Rental", value: "Rental" }
    ];

    // Wire user record to retrieve Verified__c field
    @wire(getRecord, { recordId: "$userId", fields: ['User.Verified__c'] })
    recordFunction({ data, error }) {
        if (data) {
            this.verifiedVar = data.fields.Verified__c.value;  // Set verifiedVar reactively
        } else {
            console.error(error);
        }
    }

    // Handles changes in the combobox (property type)
    changeHandler(event) {
        this.typeVar = event.target.value;
    }

    // Handles the button click to fetch properties
    handleClick() {
        getProperty({ type: this.typeVar, verified: this.verifiedVar })
            .then((result) => {
                this.isFalse = true;
                if (result != null && result.length !== 0) {
                    this.isTrue = true;
                    this.propertyList = result;
                } else {
                    this.isFalse = false;
                    this.isTrue = false;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
