const presets = [
  [
    '@babel/env',
    {
      targets: {
        ie: '8'
      },
      useBuiltIns: 'usage'
    }
  ]
]
module.exports = { presets }
