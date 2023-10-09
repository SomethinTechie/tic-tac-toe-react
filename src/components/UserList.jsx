import React from "react";

const UserList = ({users}) => {

	return (
		<ol>
			{users.map((user) => (
				<li key={user.id} className="user op6">
					{user.name} <span>0</span>
				</li>
			))}
		</ol>
	);
};

export default UserList;
