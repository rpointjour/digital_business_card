const { withPodfile } = require('@expo/config-plugins')

// Newer Xcode/Clang report full C++20 coroutine support
// (__cpp_impl_coroutine + <coroutine>), which makes folly/Portability.h
// compute FOLLY_HAS_COROUTINES=1 in any pod that doesn't explicitly define
// FOLLY_CFG_NO_COROUTINES itself. That trips folly/Expected.h into including
// folly/coro/Coroutine.h, a header this pinned RCT-Folly release doesn't
// vendor. RN's own RCT-Folly podspec already sets -DFOLLY_CFG_NO_COROUTINES=1
// via compiler_flags, but that's private to RCT-Folly's own source files —
// it doesn't propagate to other pods that transitively include
// folly/Expected.h. Define it for every pod target so the macro is visible
// everywhere. See https://github.com/facebook/react-native/issues/53575
module.exports = function withFollyCoroFix(config) {
  return withPodfile(config, (config) => {
    const anchor = 'post_install do |installer|'
    const hook = `
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |bc|
        defs = bc.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] || ['$(inherited)']
        defs = [defs] unless defs.is_a?(Array)
        defs << 'FOLLY_CFG_NO_COROUTINES=1'
        bc.build_settings['GCC_PREPROCESSOR_DEFINITIONS'] = defs
      end
    end
`
    if (config.modResults.contents.includes(anchor) && !config.modResults.contents.includes('FOLLY_CFG_NO_COROUTINES')) {
      config.modResults.contents = config.modResults.contents.replace(
        anchor,
        anchor + '\n' + hook
      )
    }
    return config
  })
}
