import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClickApply } from './(click)="apply()"';

describe('ClickApply', () => {
    let comp: ClickApply;
    let fixture: ComponentFixture<ClickApply>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ ClickApply ],
            schemas: [ NO_ERRORS_SCHEMA ]
        });
        fixture = TestBed.createComponent(ClickApply);
        comp = fixture.componentInstance;
    });

    it('can load instance', () => {
        expect(comp).toBeTruthy();
    });

});