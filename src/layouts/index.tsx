import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./index.less";

const Layout: React.FC = () => {
	return (
		<div className={styles.navs}>
			<ul>
				<li>
					<Link to="/">主页 🏠</Link>
				</li>
				<li>
					<Link to="/docs">文档 📄</Link>
				</li>
				<li>
					<a href="https://github.com/212063551/react-less">Github</a>
				</li>
			</ul>
			<Outlet />
		</div>
	);
};

export default Layout;
