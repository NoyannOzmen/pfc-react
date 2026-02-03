export function notFound(req, res) {
  const error = new Error("La ressource n'existe pas");
  error.status = 404;
  res.status(404).render('404');
}

export function errorHandler(error, req, res) {
  const status = error.status || 500;
  res.status(status);
  res.json({ message: error.message });
}
