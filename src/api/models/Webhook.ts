/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Webhook_Data } from './Webhook_Data';
import type { Webhook_Info } from './Webhook_Info';
export type Webhook = {
    /**
     * Webhook基础信息
     */
    Info?: (Webhook_Info | null);
    /**
     * Webhook配置数据
     */
    Data?: (Webhook_Data | null);
};

