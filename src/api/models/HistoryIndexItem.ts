/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HistoryIndexItem = {
    /**
     * 日期
     */
    date: string;
    /**
     * 状态
     */
    status: HistoryIndexItem.status;
    /**
     * 对应JSON文件
     */
    jsonFile: string;
};
export namespace HistoryIndexItem {
    /**
     * 状态
     */
    export enum status {
        _ = '完成',
        _ = '异常',
    }
}

