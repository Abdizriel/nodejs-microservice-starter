import ServiceRoutes from '../api/service'

export function initRoutes (app) {
  const startTime = new Date();

  // Insert routes below
  app.use('/api/services', ServiceRoutes);

  app.route('/*')
    .get((req, res) => {
        const uptime = `${new Date() - startTime}ms`;
        res.status(200).json({ startTime, uptime });
      }
    );

}
