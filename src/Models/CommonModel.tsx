import { Component, ReactNode } from "react";
import { JsxElement } from "typescript";

export class MenuModel {
    AppCode!: string;
    AppName!: string;
    url!: string;
    icon!: any;
}

export class DialogModel {
    Title!: string;
    Component!: ReactNode;
    Width: string = "auto";
    Height: any = "auto";
}