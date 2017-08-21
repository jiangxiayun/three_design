import {ANIMATIONCONFIG} from "../Config/config"


export const AnimationOpenDoors = function (doors, rad, step){

	for(let i in doors){
		let door = doors[i];

		// 第一次变化
		if(step == 1){
            door.originalPosition = door.position.clone();
		}

        let lengthhalf = door.geometry.parameters.width * door.scale.x / 2;
        let heighthalf = door.geometry.parameters.height * door.scale.y / 2;

		if(door.effectType.canOpen){
            switch (door.effectType.direction){
                case 'turn-up':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig);
                    break;
                case 'turn-down':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            door.position.z = door.originalPosition.z + heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig);
                    break;
                case 'turn-left':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig);

                    break;
                case 'turn-right':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.z = door.originalPosition.z + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig);

                    break;
                case 'move-left':

                    break;
                case 'move-right':

                    break;

            }
		}

	}
    // doors.rotation.y += rad;
};


export const AnimationCloseDoors = function (doors, rad, step){

    let sig = 1;
    for(let i in doors){
        let door = doors[i];


        let lengthhalf = door.geometry.parameters.width * door.scale.x / 2;
        let heighthalf = door.geometry.parameters.height * door.scale.y / 2;

        if(door.effectType.canClose){
            switch (door.effectType.direction){
                case 'turn-up':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig);
                    break;
                case 'turn-down':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z + heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig);
                    break;
                case 'turn-left':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig);

                    break;
                case 'turn-right':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.z = door.originalPosition.z + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig);

                    break;
                case 'move-left':

                    break;
                case 'move-right':

                    break;

            }
        }

    }
    // doors.rotation.y -= rad;
};


export const AnimationSign = function (doors, type) {
	let canDo,hasDone;
	switch (type){
		case 'hasOpen':
            canDo = 'canClose';
            hasDone = 'canOpen';
			break;
        case 'hasClose':
            canDo = 'canOpen';
            hasDone = 'canClose';
            break;
	}
    for(let i in doors) {
        let door = doors[i];
        door.effectType[canDo] = true;
        door.effectType[hasDone] = false;
    }
}

// num: open 时为1，close时为-1
export const AnimationAction = function (doors, rad, step, type) {
    let sig = 1;
    let num = (type == 'open')? 1: -1;
    let doType = (type == 'open')? 'canOpen': 'canClose';

    step = (type == 'open')? step: ANIMATIONCONFIG.time - step;

    for(let i in doors){
        let door = doors[i];

        // 门板打开时记录下元素原始位置
        if(step == 1 && type == 'open' && door.effectType[doType]){
            door.originalPosition = door.position.clone();
        }

        let lengthhalf = door.geometry.parameters.width * door.scale.x / 2;
        let heighthalf = door.geometry.parameters.height * door.scale.y / 2;


        if(door.effectType[doType]){
            switch (door.effectType.direction){
                case 'turn-up':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y + heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig*num);
                    break;
                case 'turn-down':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            door.position.z = door.originalPosition.z + heighthalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + heighthalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + heighthalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            door.position.y = door.originalPosition.y - heighthalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - heighthalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateX(rad*sig*num);
                    break;
                case 'turn-left':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            door.position.z = door.originalPosition.z - lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig*num);

                    break;
                case 'turn-right':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.y = door.originalPosition.y + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            door.position.x = door.originalPosition.x + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.z = door.originalPosition.z + lengthhalf * Math.sin(step*rad);
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            door.position.z = door.originalPosition.z + lengthhalf * (1 - Math.cos(step*rad));
                            door.position.x = door.originalPosition.x - lengthhalf * Math.sin(step*rad);
                            break;
                    }

                    door.rotateY(rad*sig*num);

                    break;
                case 'move-left':

                    break;
                case 'move-right':

                    break;

            }
        }



    }
}


export const AnimationReset = function (doors) {

    let sig = 1;
    for(let i in doors){
        let door = doors[i];
        if(door.originalPosition && door.effectType.canClose){
            door.position.copy(door.originalPosition);

            switch (door.effectType.direction){
                case 'turn-up':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                        case 'VERCITAL_BOARD':
                            sig = -1;
                            break;
                        case 'SIDE_BOARD':
                            sig = 1;
                            break;
                    }

                    door.rotateX(-ANIMATIONCONFIG.rad*sig);
                    break;
                case 'turn-down':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                        case 'VERCITAL_BOARD':
                            sig = 1;
                            break;
                        case 'SIDE_BOARD':
                            sig = -1;
                            break;
                    }

                    door.rotateX(ANIMATIONCONFIG.rad*sig);
                    break;
                case 'turn-left':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = 1;
                            break;
                        case 'VERCITAL_BOARD':
                        case 'SIDE_BOARD':
                            sig = -1;
                            break;
                    }

                    door.rotateY(-ANIMATIONCONFIG.rad*sig);
                    break;
                case 'turn-right':
                    switch (door.selfFaceType){
                        case 'HORIZONTAL_BOARD':
                            sig = -1;
                            break;
                        case 'VERCITAL_BOARD':
                        case 'SIDE_BOARD':
                            sig = 1;
                            break;
                    }

                    door.rotateY(-ANIMATIONCONFIG.rad*sig);
                    break;
                case 'move-left':

                    break;
                case 'move-right':

                    break;

            }

        }
    }
    AnimationSign(doors, 'hasClose');

}

function angle() {
    switch (door.effectType.type){
        case 'turn-up':

            break;
        case 'turn-down':

            break;
        case 'turn-left':
            switch (door.selfFaceType){
                case 'HORIZONTAL_BOARD':
                    angleDirection = 'y';
                    break;
                case 'VERCITAL_BOARD':
                    angleDirection = 'y';
                    break;
                case 'SIDE_BOARD':
                    angleDirection = 'y';
                    break;
            }
            break;
        case 'turn-right':

            break;
        case 'move-left':

            break;
        case 'move-right':

            break;

    }
}