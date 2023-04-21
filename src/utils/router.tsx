import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages";
import Docs from "@/pages/docs";
import Layout from "@/layouts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Docs />,
				loader: () => "文档",
			},
			{
				path: "/docs",
				element: <HomePage />,
				loader: () => "首页",
			},
		],
	},
	{
		path: "*",
		loader: () => "🙅 抱歉，你来到了一个错误页面 ",
		element: <>404</>,
	},
]);

export { router };
