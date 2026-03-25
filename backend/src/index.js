import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import reportRoutes from './modules/reports/report.routes.js';
import riskRoutes from './modules/risks/risk.routes.js';

const app = express()


app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use('/api/reports', reportRoutes);
app.use('/api/risks', riskRoutes);

//Test routes
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'API is running'
    });
});

//404 Handler
app.use((_req, res)=>{
    res.status(404).json({
        status: 'error',
        message: 'Resource not found'
    });
});

//Global Error Handler
app.use((err, _req, res, _next) => {
  console.error("GLOBAL ERROR:", err); // log the error
  res.status(500).json({
    status: "error",
    message: err.message || "Internal server error"
  });
});

export default app;