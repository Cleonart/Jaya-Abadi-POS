import router from './router'

const registerModule = (name, module) => {
	if(module.router){
		module.router(router);
	}
}


export const registerModules = modules => {
	console.log(modules)
}