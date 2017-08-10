import { Component, OnInit } from '@angular/core';

import { AlertService } from '../core/service/alert/alert.service';

@Component({
    // moduleId: module.id,
    selector: 'alert',
    templateUrl: 'alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getMessage()
            .subscribe(message => this.message = message);
        // this.alertService.getMessage().subscribe(message => { this.message = message; });
    }

    closeError(){ 
        this.message  = '';
    }
}