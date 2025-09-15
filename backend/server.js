const express = require("express");
const helmet = require("helmet");

const app = express();
app.use(express.json({ type: ["application/json", "application/csp-report"] }));

app.use(helmet());

const cspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],   
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'"], 
  frameAncestors: ["'none'"],
  upgradeInsecureRequests: [] 
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,       
    directives: {
      ...cspDirectives,
      
      "report-uri": ["/csp-report"],
    },

    reportOnly: process.env.NODE_ENV !== "production",
  })
);

app.post("/csp-report", (req, res) => {
  console.log("CSP Violation Report:", JSON.stringify(req.body, null, 2));
  res.sendStatus(204);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`SecureBlog API running at http://localhost:${PORT}`);
  console.log(
    `CSP mode: ${process.env.NODE_ENV !== "production" ? "REPORT-ONLY (dev)" : "ENFORCED (prod)"}`
  );
});