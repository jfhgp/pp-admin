import { get, post, newGet, newPost } from './HttpProvider';
import featureConstants from '../constants/feature-constants';
import actionsConstants from '../constants/actions-constants';

const SERVICE_URLS = {
  /* *Admin* */
  login: 'admin/login',
  signup: 'admin/signup',
  dashboard: 'admin/dashboard',
  getAllAdminUsers: 'admin/all',
  updateAdminUser: 'admin/update',
  getAdminStats: 'admin/stats',
  uploadAFile: 'users/upload',

  /* *Users* */
  getUsers: 'users/get',
  getUserById: 'users/profile',
  banUser: 'users/ban',
  searchUser: 'users/search',
  filterUser: 'users/filter',

  /* *Transporters* */
  getAllTransporters: 'transporters/get',
  getTransporterById: 'transporters/profile',
  banTransporter: 'transporters/ban',
  getNearbyTransporters: 'transporters/nearby',
  activateTransporter: 'transporters/activate',
  findTransportersToBreakOrder: 'transporters/specific',
  searchTransporter: 'transporters/search',
  getServiceAreas: 'transporters/serviceareas',
  getTransporterIdenfyStatus: 'transporters/idenfystatus',
  transporterCustomerCount: 'transporters/customers',
  transporterFilter: 'transporters/filter',
  updateAdmin: 'transporters/updateadmin',

  /* *Orders* */
  getOrders: 'orders/all',
  getOrderById: 'orders/get',
  getOrderByNumber: 'orders/search',
  updateRoute: 'orders/updateroute',
  assignOrder: 'orders/assign',
  getOrdersByDriverId: 'orders/bydriver',
  getOrdersByUserId: 'orders/user/all',
  cancelOrder: 'orders/cancel',
  modifyOrder: 'orders/update',
  estimateOrder: 'orders/rates',
  autoBreakOrder: 'orders/autobreak',
  reverseGeoCode: 'https://nominatim.openstreetmap.org/reverse?format=jsonv2',

  /* *Rates* */
  getRates: 'rates/all',
  addRates: 'rates/add',
  updateRates: 'rates/update',

  /* *Promotions* */
  getAllPromotions: 'promo/all',
  addPromotions: 'promo/add',
  expirePromotions: 'promo/expire',
  updatePromotions: 'promo/update',

  /* *Categories* */
  getAllCategories: 'categories/admin',
  getSubCategoryByParent: 'categories/getbyparent',
  addCategory: 'categories/add',
  updateCategory: 'categories/update',

  /* *Feedback* */
  getFeedbackByTransporter: 'feedback/getbytransporter',
  getFeedbackByUser: 'feedback/getbyuser',

  /* *Vehicles* */
  getAllVehicles: 'vehicles/all',
  activateVehicle: 'vehicles/activate',

  /* *Commodities* */
  updateCommodity: 'commodities/update',

  /* *Spaces* */
  findSpace: "space/find",

  /* *Finance* */
  getAllFinances: 'finance/all',
  getFinanceById: 'finance/detail',
  updateFinanceStatus: 'finance/pay',

  /* *Customer Support* */
  getAllChats: '/support/all'

};

/*
 *
 * Admin
 */
const login = ({ email, password }) =>
  post(
    SERVICE_URLS.login,
    { email, password },
    { feature: featureConstants.login }
  );

const signup = data =>
  newPost(SERVICE_URLS.signup, data, { feature: featureConstants.signup });

const dashboard = () =>
  get(SERVICE_URLS.dashboard, {}, { feature: featureConstants.dashboard });

const getAllAdminUsers = () =>
  newGet(
    SERVICE_URLS.getAllAdminUsers,
    {},
    { feature: featureConstants.roles, action: actionsConstants.read }
  );

const updateAdminUser = data =>
  newPost(SERVICE_URLS.updateAdminUser, data, {
    feature: featureConstants.roles,
    action: actionsConstants.update
  });

const getAdminStats = data =>
  newGet(SERVICE_URLS.getAdminStats, data, {
    feature: featureConstants.dashboard
  });

/*
 *
 * Users
 */
const getUsers = () =>
  get(
    SERVICE_URLS.getUsers,
    {},
    {
      feature: featureConstants.users,
      action: actionsConstants.read
    }
  );

const getUserById = data =>
  get(SERVICE_URLS.getUserById, data, {
    feature: featureConstants.users,
    action: actionsConstants.read
  });

const searchUser = data =>
  get(SERVICE_URLS.searchUser, data, {
    feature: featureConstants.users,
    action: actionsConstants.read
  });

const filterUser = (data) =>
  post(SERVICE_URLS.filterUser, data, {
    feature: featureConstants.users,
    action: actionsConstants.read
  });

const banUser = ({ _id, banned }) =>
  post(
    SERVICE_URLS.banUser,
    { _id, banned },
    {
      feature: featureConstants.users,
      action: actionsConstants.update
    }
  );

/**
 *
 * Transporters
 */
const getAllTransporters = () =>
  get(
    SERVICE_URLS.getAllTransporters,
    {},
    {
      feature: featureConstants.transporters,
      action: actionsConstants.read
    }
  );

const getTransporterById = data =>
  get(SERVICE_URLS.getTransporterById, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.read
  });

const transporterCustomerCount = data =>
  get(SERVICE_URLS.transporterCustomerCount, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.read
  });

const searchTransporter = data =>
  get(SERVICE_URLS.searchTransporter, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.read
  });

const banTransporter = ({ transporter, banned }) =>
  post(
    SERVICE_URLS.banTransporter,
    { transporter, banned },
    {
      feature: featureConstants.transporters,
      action: actionsConstants.update
    }
  );

const getNearbyTransporters = data =>
  post(SERVICE_URLS.getNearbyTransporters, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.update
  });

const transporterFilter = data =>
  post(SERVICE_URLS.transporterFilter, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.update
  });

const activateTransporter = ({ transporter }) =>
  post(
    SERVICE_URLS.activateTransporter,
    { transporter },
    {
      feature: featureConstants.transporters,
      action: actionsConstants.update
    }
  );

const findTransportersToBreakOrder = (location, type) =>
  newPost(
    SERVICE_URLS.findTransportersToBreakOrder,
    { location, type },
    {
      feature: featureConstants.transporters,
      action: actionsConstants.update
    }
  );

const getServiceAreas = data =>
  newGet(SERVICE_URLS.getServiceAreas, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.read
  });

const getTransporterIdenfyStatus = data =>
  newGet(SERVICE_URLS.getTransporterIdenfyStatus, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.update
  });

const updateTransporterAdmin = date =>
  newPost(SERVICE_URLS.updateAdmin, date, {
    feature: featureConstants.transporters,
    action: actionsConstants.update
  });

/**
 *
 * Orders
 */
const getOrders = () =>
  get(
    SERVICE_URLS.getOrders,
    {},
    {
      feature: featureConstants.orders,
      action: actionsConstants.read
    }
  );

const getOrderById = data =>
  get(SERVICE_URLS.getOrderById, data, {
    feature: featureConstants.orders,
    action: actionsConstants.read
  });

const getOrderByNumber = number =>
  get(
    SERVICE_URLS.getOrderByNumber,
    { number },
    {
      feature: featureConstants.orders,
      action: actionsConstants.read
    }
  );

const updateRoute = data =>
  post(SERVICE_URLS.updateRoute, data, {
    feature: featureConstants.orders,
    action: actionsConstants.update
  });


const findSpaces = data =>
  post(SERVICE_URLS.findSpace, data, {
    feature: featureConstants.orders,
    action: actionsConstants.update
  });

const assignOrder = data =>
  post(SERVICE_URLS.assignOrder, data, {
    feature: featureConstants.orders,
    action: actionsConstants.update
  });

const getOrdersByDriver = data =>
  get(SERVICE_URLS.getOrdersByDriverId, data, {
    feature: featureConstants.orders,
    action: actionsConstants.read
  });

const getOrdersByUserId = data =>
  get(SERVICE_URLS.getOrdersByUserId, data, {
    feature: featureConstants.users,
    action: actionsConstants.read
  });

const modifyOrder = data =>
  post(SERVICE_URLS.modifyOrder, data, {
    feature: featureConstants.orders,
    action: actionsConstants.update
  });

const estimateOrder = data =>
  newPost(SERVICE_URLS.estimateOrder, data, {
    feature: featureConstants.orders,
    action: actionsConstants.read
  });

const cancelOrder = ({ _id, cancellationReason }) =>
  post(
    SERVICE_URLS.cancelOrder,
    { _id, cancellationReason },
    {
      feature: featureConstants.orders,
      action: actionsConstants.update
    }
  );

const autoBreakOrder = id =>
  newGet(
    SERVICE_URLS.autoBreakOrder,
    { id },
    {
      feature: featureConstants.orders,
      action: actionsConstants.update
    }
  );

/**
 *
 * Rates
 */
const getRates = () =>
  get(
    SERVICE_URLS.getRates,
    {},
    {
      feature: featureConstants.rates,
      action: actionsConstants.read
    }
  );

const addRates = data =>
  post(SERVICE_URLS.addRates, data, {
    feature: featureConstants.rates,
    action: actionsConstants.create
  });

const updateRates = data =>
  post(SERVICE_URLS.updateRates, data, {
    feature: featureConstants.rates,
    action: actionsConstants.update
  });

/**
 *
 * Promotions
 */
const getAllPromotions = () =>
  get(
    SERVICE_URLS.getAllPromotions,
    {},
    {
      feature: featureConstants.promotions,
      action: actionsConstants.read
    }
  );

const addPromotions = data =>
  post(SERVICE_URLS.addPromotions, data, {
    feature: featureConstants.promotions,
    action: actionsConstants.create
  });

const expirePromotions = data =>
  post(SERVICE_URLS.expirePromotions, data, {
    feature: featureConstants.promotions,
    action: actionsConstants.update
  });

const updatePromotions = data =>
  post(SERVICE_URLS.updatePromotions, data, {
    feature: featureConstants.promotions,
    action: actionsConstants.update
  });

/**
 *
 * Categories
 */
const getAllCategories = () =>
  get(
    SERVICE_URLS.getAllCategories,
    {},
    {
      feature: featureConstants.categories,
      action: actionsConstants.read
    }
  );

const getSubCategoryByParent = parentId =>
  get(
    SERVICE_URLS.getSubCategoryByParent,
    { parentId },
    {
      feature: featureConstants.categories,
      action: actionsConstants.read
    }
  );

const addCategory = data =>
  post(SERVICE_URLS.addCategory, data, {
    feature: featureConstants.categories,
    action: actionsConstants.create
  });

const updateCategory = data =>
  post(SERVICE_URLS.updateCategory, data, {
    feature: featureConstants.categories,
    action: actionsConstants.create
  });

/**
 *
 * Feedback
 */
const getFeedbackByTransporter = data =>
  get(SERVICE_URLS.getFeedbackByTransporter, data, {
    feature: featureConstants.transporters,
    action: actionsConstants.read
  });

const getFeedbackByUser = data =>
  get(SERVICE_URLS.getFeedbackByUser, data, {
    feature: featureConstants.users,
    action: actionsConstants.read
  });

/**
 *
 * Vehicles
 */
const getAllVehicles = () =>
  get(
    SERVICE_URLS.getAllVehicles,
    {},
    {
      feature: featureConstants.vehicles,
      action: actionsConstants.read
    }
  );

const activateVehicle = ({ vehicle }) =>
  post(
    SERVICE_URLS.activateVehicle,
    { vehicle },
    {
      feature: featureConstants.transporters,
      action: actionsConstants.update
    }
  );

/**
 *
 * Commodities
 */
const updateCommodity = data =>
  newPost(SERVICE_URLS.updateCommodity, data, {
    feature: featureConstants.orders,
    action: actionsConstants.update
  });

/**
 *
 * Finance
 */
const getAllFinances = () =>
  newGet(
    SERVICE_URLS.getAllFinances,
    {},
    {
      feature: featureConstants.finance,
      action: actionsConstants.read
    }
  );

const getFinanceById = id =>
  newGet(
    SERVICE_URLS.getFinanceById,
    { id },
    {
      feature: featureConstants.finance,
      action: actionsConstants.read
    }
  );

const updateFinanceStatus = ({ lastPaidAmount, bankAccount, _id }) =>
  newPost(
    SERVICE_URLS.updateFinanceStatus,
    {
      lastPaidAmount,
      bankAccount,
      _id
    },
    {
      feature: featureConstants.finance,
      action: actionsConstants.update
    }
  );


const getAllChats = () =>
  newGet(
    SERVICE_URLS.getAllChats,
    {},
    {
      feature: featureConstants.customerSupport,
      action: actionsConstants.read
    }
  );

const uploadAFile = data => newPost(SERVICE_URLS.uploadAFile, data, {
  feature: featureConstants.customerSupport,
  action: actionsConstants.read
});

const apiServices = {
  // Auth
  login,
  dashboard,
  signup,
  getAllAdminUsers,
  updateAdminUser,
  getAdminStats,

  // Users
  getUsers,
  getUserById,
  banUser,
  searchUser,
  filterUser,

  // Transporters
  getAllTransporters,
  getTransporterById,
  transporterCustomerCount,
  transporterFilter,
  banTransporter,
  activateTransporter,
  getNearbyTransporters,
  findTransportersToBreakOrder,
  searchTransporter,
  getServiceAreas,
  getTransporterIdenfyStatus,
  updateTransporterAdmin,

  // Orders
  getOrders,
  getOrderById,
  getOrderByNumber,
  updateRoute,
  assignOrder,
  getOrdersByDriver,
  getOrdersByUserId,
  cancelOrder,
  modifyOrder,
  estimateOrder,
  autoBreakOrder,

  // Rates
  addRates,
  getRates,
  updateRates,

  // Promotions
  getAllPromotions,
  addPromotions,
  expirePromotions,
  updatePromotions,

  // Categories
  getAllCategories,
  getSubCategoryByParent,
  addCategory,
  updateCategory,

  // Feedback
  getFeedbackByTransporter,
  getFeedbackByUser,

  // Vehicles
  getAllVehicles,
  activateVehicle,

  // Commodities
  updateCommodity,

  //Spaces
  findSpaces,

  // Finance
  getAllFinances,
  getFinanceById,
  updateFinanceStatus,

  // Customer Support
  getAllChats,

  // Upload file
  uploadAFile
};
export default apiServices;

// const getAddress = data => {
//   const params = `&lat=${data[0]}&lon=${data[1]}`;
//   const url = SERVICE_URLS.reverseGeoCode + params;
//   return independentRequest(url, 'get');
// };
