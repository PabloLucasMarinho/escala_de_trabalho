import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import GetWorkplaceJson from '../../filter/shift-filter/workplace.model';
import { Router } from '@angular/router';

export default class WorkplaceHandle {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  private workplace: string;
  constructor(workplace: string) {
    this.workplace = workplace;
  }

  edit() {
    const subscription = this.httpClient.put<GetWorkplaceJson>(`${this.baseUrl}/workplace`);
  }
}
