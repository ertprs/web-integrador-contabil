import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChecklistAnswer, ChecklistInputType, ChecklistQuestion } from '@shared/models/Checklist';
import { momentjs } from '@shared/utils/moment';

@Component({
  selector: 'checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss']
})
export class ChecklistItemComponent implements AfterViewInit, OnChanges {

  @Input()
  public question: ChecklistQuestion;

  @Input()
  public scriptId: number;

  @Input()
  public answer: string;

  @Output()
  public ok = new EventEmitter<ChecklistAnswer>();

  public type = ChecklistInputType;
  public ctrl = new FormControl();

  public observation = new FormControl();

  private get value() {
    const value = this.ctrl.value;
    const type = this.type;

    switch (this.question.tipoInput) {
      case type.CHECKBOX:    return !!value;
      case type.SELECT:      return value.valor;
      case type.MULT_SELECT: return value.map(val => val.valor).join(';');
      case type.DATE:        return momentjs(value).format('YYYY-MM-DD');
      default:               return value;
    }
  }

  public submit() {
    this.ok.emit({ perguntaId: this.question.id, resposta: this.value, observacoes: this.observation.value, roteiroId: this.scriptId });
  }

  public parse = (src: any) => src.descricao;

  ngAfterViewInit(): void {
    if (this.question.tipoInput === ChecklistInputType.CHECKBOX || this.question.tipoInput === ChecklistInputType.DATE) {
      this.submit();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const key in changes) {
      if (changes.hasOwnProperty(key) && key === 'answer' && this.answer) {
        if (this.question.tipoInput === ChecklistInputType.SELECT || this.question.tipoInput === ChecklistInputType.MULT_SELECT) {
          const value = this.question.opcoesResposta.filter(opt => opt.valor === this.answer)[0];
          this.ctrl.setValue(value);
        } else {
          this.ctrl.setValue(this.answer);
        }
      }
    }
  }

}