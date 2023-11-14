import { AppDataSource } from "../data-source";
import { Category } from "../entity/Category";
import log4js from "log4js";
const log = log4js.getLogger("repository:category");
log.level = "debug";

export const create = async (body: any) => {
    const data = await Category.save(body)
    return data;
};

export const findAll = async (limit: number, offset: number, filter: any) => {
    const data = await Category.findAndCount({
        where: filter,
        skip: offset,
        take: limit
    });
    log.warn('data', data)
    return data;
};


export const bulkCreate = async (bodyArr: any) => {
    log.warn("bodyarr", bodyArr)
    const db = await AppDataSource()
    const data = await db
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values([bodyArr])
        .execute()
    return data;
};

export const findOne = async (filter: any) => {
    const data = await Category.findOne({ where: filter });
    return data
};

export const destroy = async (filter: any) => {
    // const data = await Category.softRemove(filter) // hard delete
    // const data = await AppDataSource
    //     .createQueryBuilder(Category, "category")
    //     .softDelete()
    //     .where("id = :id", filter).execute();
    const db = await AppDataSource()
    const data = await db.manager.createQueryBuilder(Category, "category").softDelete().where("id = :id", filter).execute();
    return data
};