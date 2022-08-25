"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controllers/users.controller"));
const users_middlewares_1 = __importDefault(require("./middlewares/users.middlewares"));
class UserRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UserRoutes');
    }
    configureRoutes() {
        this.app.route('/users')
            .get(users_controller_1.default.listUsers)
            .post(users_middlewares_1.default.validateRequiredUserBodyFields, users_middlewares_1.default.validateSameEmailDoesntExist, users_controller_1.default.createUser);
        this.app.param(`userId`, users_middlewares_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middlewares_1.default.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            users_middlewares_1.default.validateRequiredUserBodyFields,
            users_middlewares_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            users_middlewares_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEseUVBQW9FO0FBQ3BFLHNGQUE2RDtBQUM3RCx3RkFBK0Q7QUFFL0QsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBQzlDLFlBQVksR0FBdUI7UUFDL0IsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZTtRQUVYLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNuQixHQUFHLENBQUMsMEJBQWUsQ0FBQyxTQUFTLENBQUM7YUFDOUIsSUFBSSxDQUNELDJCQUFnQixDQUFDLDhCQUE4QixFQUMvQywyQkFBZ0IsQ0FBQyw0QkFBNEIsRUFDN0MsMEJBQWUsQ0FBQyxVQUFVLENBQzdCLENBQUM7UUFHTixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsMkJBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUFDLDJCQUFnQixDQUFDLGtCQUFrQixDQUFDO2FBQ3hDLEdBQUcsQ0FBQywwQkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMsMEJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUMzQiwyQkFBZ0IsQ0FBQyw4QkFBOEI7WUFDL0MsMkJBQWdCLENBQUMsaUNBQWlDO1lBQ2xELDBCQUFlLENBQUMsR0FBRztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3QiwyQkFBZ0IsQ0FBQyxrQkFBa0I7WUFDbkMsMEJBQWUsQ0FBQyxLQUFLO1NBQ3hCLENBQUMsQ0FBQztRQUdILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUFyQ0QsZ0NBcUNDIn0=