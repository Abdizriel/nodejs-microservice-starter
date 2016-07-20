'use strict';

/**
 * @description Express Framework Router
 * @param Router
 */
import { Router } from 'express';

/**
 * @description Service route Controller
 * @param ServiceController
 */
import * as ServiceController from './service.controller';

let router = new Router();

router.get('/', ServiceController.index);
router.get('/:id', ServiceController.show);
router.post('/', ServiceController.create);
router.put('/:id', ServiceController.update);
router.patch('/:id', ServiceController.update);
router.delete('/:id', ServiceController.destroy);

/**
 * @description Configured router for Service Routes
 * @exports router
 * @default
 */
export default router;
