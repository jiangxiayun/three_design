

/**
 * History类  主要负责历史栈  记录历史操作
 * 
 * @class History
 */
class History {

	constructor(){
		// this.currentPointer = 0;
		this.stateStack = [];
		this.tempStack = [];

	}
	pushState(obj){
		let historyStep = {};
		historyStep.time = new Date().getUTCDate();
		if( typeof obj  == 'object'){
			historyStep.value = JSON.parse(JSON.stringify(obj));
		}else{
			historyStep.value = obj;
		}
		

		this.stateStack.push(historyStep);
	}

	undo(){
		let upObj = this.stateStack.pop();
		this.tempStack.push(upObj);
		return upObj;
	}

	redo (){

		let upObj = this.tempStack.pop();
		this.stateStack.push(upObj);
		return upObj;

	}

	getCurrentPointer (){

		return this.stateStack.length - 1;
	}
	getCurrentStep() {

		return this.stateStack[ this.stateStack.le  - 1];
	}

	setHistoryPointer(point){

	}
}

export default History;