import React from "react";

const UserList = ({users}) => {

	return (
		<ol>
			{users.map((user) => (
				<li key={user.id} className="user op6">
					{user.name} - {user.email}
				</li>
			))}
		</ol>
	);
};

export default UserList;
