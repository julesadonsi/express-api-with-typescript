"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const common_permissionflag_enum_1 = require("./common.permissionflag.enum");
const log = (0, debug_1.default)('app:common-permission-middleware');
class CommonPermissionMiddleware {
    permissionFlagRequired(requiredPermissionFlag) {
        return (req, res, next) => {
            try {
                const userPermissionFlags = parseInt(res.locals.jwt.permissionflags);
                if (userPermissionFlags && requiredPermissionFlag) {
                    next();
                }
                else {
                    res.status(403).send();
                }
            }
            catch (error) {
                log(error);
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionFlags = parseInt(res.locals.jwt.permissionflags);
            if (req.params && req.params.userId && req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            else {
                if (userPermissionFlags && common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION) {
                    next();
                }
                else {
                    return res.status(403).send();
                }
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxrREFBMEI7QUFFMUIsNkVBQThEO0FBRTlELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sMEJBQTBCO0lBRTVCLHNCQUFzQixDQUFDLHNCQUFzQztRQUN6RCxPQUFPLENBQ0gsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDNUIsRUFBRTtZQUNBLElBQUk7Z0JBQ0EsTUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQ2hDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FDakMsQ0FBQztnQkFDRixJQUFJLG1CQUFtQixJQUFJLHNCQUFzQixFQUFFO29CQUMvQyxJQUFJLEVBQUUsQ0FBQztpQkFDVjtxQkFBTTtvQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMxQjthQUNKO1lBQUEsT0FBTSxLQUFLLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2Q7UUFDTCxDQUFDLENBQUE7SUFDTCxDQUFDO0lBR0ssa0NBQWtDLENBQ3BDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNyRSxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDO2dCQUMvRSxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2pCO2lCQUFNO2dCQUNILElBQUcsbUJBQW1CLElBQUksMkNBQWMsQ0FBQyxnQkFBZ0IsRUFBQztvQkFDdEQsSUFBSSxFQUFFLENBQUM7aUJBQ1Y7cUJBQU07b0JBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNqQzthQUNKO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFHRCxrQkFBZSxJQUFJLDBCQUEwQixFQUFFLENBQUMifQ==