// * Cette fonction prend une méthode de controller en paramètre, et elle va exécuter cette méthode, si une erreur est levé dans la méthode exécutée, on appelle next avec l'erreur en argument
// * Ce type de fonction s'appelle un wrapper
function catchErrors(controllerMethod) {
  return async function (req, res, next) {
    try {
      await controllerMethod(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export { catchErrors };
