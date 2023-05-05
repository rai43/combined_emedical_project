const fs = require('fs');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user-routes');
const beneficiaryRoutes = require('./routes/beneficiary-routes');
const constantRoutes = require('./routes/constants-routes');
const consultationRoutes = require('./routes/consultation-routes');
const examsRoutes = require('./routes/exams-routes');
const medicalCertificateRoutes = require('./routes/medical-certificate-routes');
const medicationRoutes = require('./routes/medication-routes');
const internalPrescriptionRoutes = require('./routes/internal-prescription-routes');
const externalPrescriptionRoutes = require('./routes/external-prescription-routes');
const medicalActRoutes = require('./routes/medical-act-routes');
const countRoutes = require('./routes/count-routes');
// const usersRoutes = require('./routes/users-routes');
// const HttpError = require('./models/http-error');

// 401 => Unauthorized
// 403 => Forbidden / not authenticated

const app = express();

app.use(express.json());

app.use('/uploads/documents/external_exams', express.static(path.join('uploads', 'documents', 'external_exams')));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
	next();
});

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Outside
app.use('/api/users', userRoutes);
app.use('/api/beneficiary', beneficiaryRoutes);
app.use('/api/constants', constantRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/medical-certificate', medicalCertificateRoutes);
app.use('/api/medication', medicationRoutes);
app.use('/api/internal-prescription', internalPrescriptionRoutes);
app.use('/api/external-prescription', externalPrescriptionRoutes);
app.use('/api/medical-act', medicalActRoutes);
app.use('/api/count', countRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')));

mongoose
	.connect('mongodb+srv://rai43:pass1234@cnps.g2tk7fe.mongodb.net/health-insurance?retryWrites=true&w=majority')
	.then(() => {
		app.listen(8080, () => console.log(`Server started on port 8080`));
	})
	.catch((error) => {
		console.log(error);
	});
