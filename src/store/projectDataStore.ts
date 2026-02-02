import { create } from 'zustand';

interface iMemberInfo {
	role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
	is_confirmed: boolean;
	user: {
		id: string;
		firstname: string;
		lastname: string;
		email: string;
		username: string;
	};
}

export interface iMemberInfoFormated {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	username: string;
	role: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST';
	is_confirmed: boolean;
}

interface iSortedMembers {
	admin: iMemberInfoFormated[];
	collab: iMemberInfoFormated[];
	guest: iMemberInfoFormated[];
	notConfirmed: iMemberInfoFormated[];
}

interface IProjectInfo {
	id: string;
	title: string;
	description?: string | null;
	date_start: Date;
	date_end: Date;
}

export interface iTaskinfo {
	id: string;
	title: string;
	description?: string | null;
	priority: 'LOW' | 'MEDIUM' | 'HIGH';
	statuts: 'BACKLOG' | 'TODO' | 'ON_GOING' | 'ON_TEST' | 'FINISHED';
	image?: string | null;
	date_start: Date | null;
	delay: number;
	worked_time: number;
	date_end: Date | null;
	task_category: { id: string; title: string };
	subtasks: { id: string; description: string; is_done: boolean }[];
	user_assigned: {
		user: {
			id: string;
			firstname: string;
			lastname: string;
			username: string;
		};
	}[];
}

interface task_categories {
	id: string;
	title: string;
}

interface iProjectDataStore {
	currentRole: 'OWNER' | 'ADMIN' | 'COLLAB' | 'GUEST' | null;
	projectInfo: IProjectInfo | null;
	projectMembers: iSortedMembers | null;
	taskCategories: task_categories[] | null;
	tasks: iTaskinfo[] | null;
	setProjectMembers: (members: iMemberInfo[]) => void;
	setProjectInfo: (project: IProjectInfo) => void;
	setTaskCategories: (categories: task_categories[]) => void;
	setTasks: (tasks: iTaskinfo[]) => void;
	reset: () => void;
}

export const projectDataStore = create<iProjectDataStore>((set) => ({
	currentRole: null,
	projectInfo: null,
	projectMembers: null,
	taskCategories: null,
	tasks: null,

	setProjectMembers: (members: iMemberInfo[]) => {
		set({ projectMembers: null });
		const sortedMembers: iSortedMembers = {
			admin: [],
			collab: [],
			guest: [],
			notConfirmed: [],
		};

		members.forEach((member) => {
			if (member.user.id === localStorage.getItem('user_id'))
				set({ currentRole: member.role });

			const memberData: iMemberInfoFormated = {
				id: member.user.id,
				firstname: member.user.firstname,
				lastname: member.user.lastname,
				email: member.user.email,
				username: member.user.username,
				role: member.role,
				is_confirmed: member.is_confirmed,
			};

			if (
				(memberData.is_confirmed && memberData.role === 'ADMIN')
				|| memberData.role === 'OWNER'
			)
				sortedMembers.admin.push(memberData);

			if (memberData.is_confirmed && memberData.role === 'COLLAB')
				sortedMembers.collab.push(memberData);

			if (memberData.is_confirmed && memberData.role === 'GUEST')
				sortedMembers.guest.push(memberData);

			if (!memberData.is_confirmed)
				sortedMembers.notConfirmed.push(memberData);
		});

		set({ projectMembers: sortedMembers });
	},

	setProjectInfo: (project) => {
		const projectData = {
			id: project.id,
			title: project.title,
			description: project.description || null,
			date_start: project.date_start,
			date_end: project.date_end,
		};
		set({ projectInfo: projectData });
	},

	setTaskCategories: (categories) => {
		set({ taskCategories: categories });
	},

	setTasks: (taskList) => {
		set({ tasks: taskList });
	},

	reset: () =>
		set({
			currentRole: null,
			projectInfo: null,
			projectMembers: null,
			taskCategories: null,
			tasks: null,
		}),
}));
