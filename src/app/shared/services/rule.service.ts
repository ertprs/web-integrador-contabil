import { Injectable } from '@angular/core';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { RuleCreateFormat, PostFormatRule } from '@shared/models/Rule';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { CompleteRule } from '@shared/models/CompleteRule';
import { GenericResponse } from '@shared/models/GenericResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor(private _http: HttpHandlerService) { }

  createRule(rule: RuleCreateFormat): Observable<any> {
    return this._http.post(`${BASE_URL}/api/v1/regras`, rule, 'Falha ao criar regra!');
  }

  getAllIds(cnpjEmpresa: string, tipoLancamento: number) {
    const url = `${BASE_URL}/api/v1/salesforce/id?cnpjEmpresa=${cnpjEmpresa}&tipoLancamento=${tipoLancamento}`;
    return this._http.get<number[]>(url, 'Falha ao obter lista completa de regras!');
  }

  exportById(id: number) {
    const url = `${BASE_URL}/api/v1/salesforce/patch/${id}`;
    return this._http.patch(url, {}, 'Falha ao exportar regra!');
  }

  get(searchCriteria: any): Observable<GenericPageableResponse<CompleteRule>> {
    const url = `${BASE_URL}/api/v1/regras`;
    return this._http.get<GenericPageableResponse<any>>([url, searchCriteria], 'Falha ao obter regras!');
  }

  changePosition(rule: CompleteRule) {
    const url = `${BASE_URL}/api/v1/regras/${rule.id}/posicao`;
    return this._http.put(url, { posicao: rule.posicao }, 'Falha ao alterar posição da regra!');
  }

  moveToTop(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/inicio`;
    return this._http.put(url, {}, 'Falha ao mover regra para o início!');
  }

  moveToBottom(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}/posicao/final`;
    return this._http.put(url, {}, 'Falha ao mover regra para o final!');
  }

  // ! WORKING, BUT DEPRECATED
  // move(rule: CompleteRule) {
  //   const url = `${BASE_URL}/api/v1/regras/${rule.id}/alterar_posicao?cnpjEmpresa=${rule.cnpjEmpresa}&tipoLancamento=${rule.tipoLancamento}`;
  //   return this._http.put(url, { posicao: rule.posicao }, this._headers);
  // }

  delete(id: number) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.delete(url, 'Falha ao excluir regra!');
  }

  update(id: number, rule: { regras: PostFormatRule[], contaMovimento: string }) {
    const url = `${BASE_URL}/api/v1/regras/${id}`;
    return this._http.put(url, rule, 'Falha ao atualizar regra!');
  }

  // ! DISCONTINUED, MAY NOT WORK
  // export(cnpjEmpresa: string, tipoLancamento: number): Observable<GenericResponse<undefined>> {
  //   const url = `${BASE_URL}/api/sf/importar?cnpjEmpresa=${cnpjEmpresa}&tipoLancamento=${tipoLancamento}`;
  //   return this._http.post<GenericResponse<undefined>>(url, {}, this._headers);
  // }

}
