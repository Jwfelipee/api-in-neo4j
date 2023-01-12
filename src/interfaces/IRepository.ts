interface IRepositoryCrud<T> extends IRepositoryDelete, IRepositoryRead<T>, IRepositoryCreate<T>, IRepositoryUpdate<T> {}

interface IRepositoryDelete {
	delete(id: any): Promise<boolean>;
}

interface IRepositoryRead<T> {
	getAll(): Promise<T[]>;
	getById(id: number): Promise<T | undefined>;
}

interface IRepositoryCreate<T> {
	create(p: Partial<T>): Promise<T>;
}

interface IRepositoryUpdate<T> {
	update(p: Partial<T>): Promise<T>;
}

export { IRepositoryCrud, IRepositoryDelete, IRepositoryRead, IRepositoryCreate, IRepositoryUpdate };
