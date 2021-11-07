

import express, {Request, Response, Router, NextFunction} from 'express';

import ErrorResponse from "../../utils/ErrorResponse";
import asyncHandler from "../../middlewares/async";
import { pool } from '../../config/db';





/* 

    project_id: 'N/A',
    projectName: 'N/A',
    status: 'N/A',
    typeOfInvestment: 'N/A',
    typeOfProperty: 'N/A',
    project: 'N/A',
    term: 'N/A',
    yieldPA: 'N/A',
    volumeTotal: 'N/A',
    volumeInvested: 'N/A',
    volumeLeft: 'N/A',
    currency: 'N/A',
    minimumInvestment: 'N/A',
    country: 'N/A',
    owner: user_id,
    listOfInvestors: [],
    likes: 'N/A',
    created_at: moment().format('DD/MM/YYYY - HH:mm'),
    startDate: moment().format('DD/MM/YYYY - HH:mm'),
    closeDate: moment().format('DD/MM/YYYY - HH:mm')

*/