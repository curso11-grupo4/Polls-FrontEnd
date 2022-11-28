import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablestationsComponent } from './tablestations.component';

describe('TablestationsComponent', () => {
  let component: TablestationsComponent;
  let fixture: ComponentFixture<TablestationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablestationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
