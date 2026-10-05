import { useEffect, useRef, useState } from "react"

enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '/'
}

export const useCalculator= () =>{

const [formula, setFormula] = useState('0'); 
const [number, setNumber] = useState('0'); 
const [prevNumber, setPrevNumber] = useState('0'); 

const lastOperation = useRef<Operator>(); 



useEffect(()=>{
 if (lastOperation.current) {
    const firtsFormulaPart = formula.split(' ').at(0);
    setFormula(`${firtsFormulaPart} ${lastOperation.current} ${number}`)
 }else{
    setFormula(number);
 }

}, [number])


useEffect(() =>{
//Todo: calcular subresultado
const subResult = calculateResult();
setPrevNumber(`${subResult}`)

}, [formula])


const setLastNumber = () =>{
//TODO calculate result
    if (number.endsWith('.')) {
        setPrevNumber(number.slice(0, -1))
        
    }
    setPrevNumber(number);
    setNumber('0')
}

const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;

}

const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
}

const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
}

const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
}

const deleteLast = () => {

if (number.length === 1 || (number.length === 2 && number.startsWith('-'))) {
        return setNumber('0');
    }

  let currentSign = '';
  let temporalNumber = number;

  

  if(number.includes('-')){
    currentSign = '-';
    temporalNumber = number.substring(1);}

if (temporalNumber.length > 1) {
    
    return setNumber(currentSign + temporalNumber.slice(0, -1));
    
}
setNumber('0')

}

const toggleSign = () => {
    if (number.includes('-')) {
        return setNumber(number.replace('-', ''))

    }
    setNumber('-'+ number);
}


const clean = () =>{
    setNumber('0')
    setPrevNumber('0')
    setFormula('0')

    lastOperation.current = undefined;

}

const calculateResult = () => {

const [firstValue, operation , secondValue ] = formula.split(' ');
const num1 = Number(firstValue)
const num2 = Number(secondValue)

if (isNaN(num2)) return null;

switch (operation) {
    case Operator.add:
        return num1 + num2
    
    case Operator.divide:
        return num1 / num2
    
    case Operator.subtract:
        return num1 - num2
    
    case Operator.multiply:
        return num1 * num2
    
    
    default:
        throw new Error('Operacion  errada')
        
}



}


const buildNumber = (numberString: string) => {

//verificar si existe el punto decimal 
    if (number.includes('.') && numberString=== '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
    
    if (numberString === '.') {
        return setNumber(number + numberString);
    }
    //si es otro cero y no hay punto
    if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
    } // <- Aquí faltaba cerrar esta llave

    //evaluar si es diferente de cero, no hay punto y es el primer numero 
    if (numberString !== '0' && !number.includes('.')) {
         return setNumber(numberString);
    }   
    //no se puedan escribir 000000000
    if (numberString=== '0' && !number.includes('.')) {
        return;
    }

}

setNumber(number + numberString);
   
}

return{
formula,
number,
prevNumber,


// METHODS
buildNumber,
clean,
toggleSign,
deleteLast,
divideOperation,
addOperation,
subtractOperation,
multiplyOperation,
calculateResult
}

}