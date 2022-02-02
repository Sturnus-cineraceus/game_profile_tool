
import * as log from 'loglevel'

export default ({ $config }, inject) => {
    if ($config.DEV_MODE == 1) {
        log.setLevel('trace')
    } else {
        log.setLevel('info')
    }
    inject('logger', log)
}
