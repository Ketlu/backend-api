export type TVultrCreateInstance = {
    region: IVultrRegion.Region['id']
    plan: IVultrPlan.Plan['id']
    label: string
    os_id: IVultrOS.O['id']
}

export declare module IVultrPlan {
    export interface Plan {
        id: string
        vcpu_count: number
        ram: number
        disk: number
        disk_count: number
        bandwidth: number
        monthly_cost: number
        type: string
        locations: string[]
    }

    export interface Links {
        next: string
        prev: string
    }

    export interface Meta {
        total: number
        links: Links
    }

    export interface RootObject {
        plans: Plan[]
        meta: Meta
    }
}

export declare module IVultrRegion {
    export interface Region {
        id: string
        city: string
        country: string
        continent: string
        options: string[]
    }

    export interface Links {
        next: string
        prev: string
    }

    export interface Meta {
        total: number
        links: Links
    }

    export interface RootObject {
        regions: Region[]
        meta: Meta
    }
}

export declare module IVultrOS {
    export interface O {
        id: number
        name: string
        arch: string
        family: string
    }

    export interface Links {
        next: string
        prev: string
    }

    export interface Meta {
        total: number
        links: Links
    }

    export interface RootObject {
        os: O[]
        meta: Meta
    }
}

export declare module IVultrCreateInstance {
    export interface Instance {
        id: string
        os: string
        ram: number
        disk: number
        main_ip: string
        vcpu_count: number
        region: string
        plan: string
        date_created: Date
        status: string
        allowed_bandwidth: number
        netmask_v4: string
        gateway_v4: string
        power_status: string
        server_status: string
        v6_network: string
        v6_main_ip: string
        v6_network_size: number
        label: string
        internal_ip: string
        kvm: string
        tag: string
        os_id: number
        app_id: number
        firewall_group_id: string
        features: any[]
        default_password: string
    }

    export interface RootObject {
        instance: Instance
    }
}

export declare module IVultrGetInstance {
    export interface Instance {
        id: string
        os: string
        ram: number
        disk: number
        main_ip: string
        vcpu_count: number
        region: string
        plan: string
        date_created: Date
        status: string
        allowed_bandwidth: number
        netmask_v4: string
        gateway_v4: string
        power_status: string
        server_status: string
        v6_network: string
        v6_main_ip: string
        v6_network_size: number
        label: string
        internal_ip: string
        kvm: string
        tag: string
        os_id: number
        app_id: number
        firewall_group_id: string
        features: any[]
    }

    export interface RootObject {
        instance: Instance
    }
}
