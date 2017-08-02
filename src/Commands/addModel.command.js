import  Model from "../Objects/Model";

const addModel = (scene ,options) =>{


	let modelOptions = {
		name :'model',
        size: {
            width: options.width,
            height: options.height,
            depth: options.depth,
        }
	};




    let model = new Model(modelOptions);
    model.joinScene(scene);
    model.joinModelHelperScene(scene);
	return model;
}

export default addModel;