/**
 * Training center router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/training-centers',
      handler: 'training-center.find',
      config: {
        policies: []
      }
    },
    {
      method: 'GET',
      path: '/training-centers/:id',
      handler: 'training-center.findOne',
      config: {
        policies: []
      }
    },
    {
      method: 'POST',
      path: '/training-centers',
      handler: 'training-center.create',
      config: {
        policies: []
      }
    },
    {
      method: 'PUT',
      path: '/training-centers/:id',
      handler: 'training-center.update',
      config: {
        policies: []
      }
    },
    {
      method: 'DELETE',
      path: '/training-centers/:id',
      handler: 'training-center.delete',
      config: {
        policies: []
      }
    }
  ]
};