export enum EInstanceStatus {
    CREATION_PENDING = 'creation_pending',
    CREATING = 'creating',

    START_PENDING = 'start_pending',
    STARTING = 'starting',
    STARTED = 'started',

    REBOOT_PENDING = 'reboot_pending',
    REBOOTING = 'rebooting',

    REMOVE_PENDING = 'remove_pending',
    REMOVING = 'removing',
    REMOVED = 'removed',

    STOP_PENDING = 'stop_pending',
    STOPPING = 'stopping',
    STOPPED = 'stopped'
}
