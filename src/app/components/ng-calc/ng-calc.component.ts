import { Component } from '@angular/core';

@Component({
  selector: 'app-ng-calc',
  templateUrl: './ng-calc.component.html',
  styleUrls: ['./ng-calc.component.css']
})
export class NgCalcComponent {
  input:string = '';
  result:string = '';
  
 
  pressNum(num: string) {
    //Don't allow multiple periods
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand();
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
    //No zeroes at the beginning
    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+' || PrevKey === '%')  {
          return;
      }
    }
 
    this.input = this.input + num;
    this.calcAnswer();
  }
 
 //Get the last operand in the string
  getLastOperand() {
    let pos:number;
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    if (this.input.toString().lastIndexOf("%") > pos) pos=this.input.lastIndexOf("%")
    return this.input.substr(pos+1);
  }
 
 //Add an operand to the input when pressed
  pressOperator(op: string) {
 
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '%')  {
      return;
    }
   
    this.input = this.input + op
    this.calcAnswer();
  }
 
 //Reset the input
  clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 //Reset both input and the result
  allClear() {
    this.result = '';
    this.input = '';
  }
 
  calcAnswer() {
    let formula = this.input;
 
    let lastKey = formula[formula.length - 1];
    //Can't have last element be a period
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
    
    //recalculate the last element
    lastKey = formula[formula.length - 1];
    
    //check if last element is operator
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.' || lastKey === '%')  {
      formula=formula.substr(0,formula.length - 1);
    }
    this.result = eval(formula);
  }
  //Get the answer and reset input
  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }
}
