const mysql = require('mysql2/promise');
let conn;

// Hàm kết nối cơ sở dữ liệu
async function connectDB() {
    if (!conn) {
        conn = await mysql.createConnection({
            host: 'localhost',  // Cấu hình host phù hợp
            user: 'your_username',  // Tên người dùng cơ sở dữ liệu
            password: 'your_password',  // Mật khẩu cơ sở dữ liệu
            database: 'your_database'  // Tên cơ sở dữ liệu
        });
    }
}

// Hàm thực hiện truy vấn
async function query(sql, data = [], check = false) {
    try {
        await connectDB();
        const [rows] = await conn.execute(sql, data);
        return check ? rows : true;
    } catch (error) {
        console.error(`Error: ${error.message}\nFile: ${error.fileName}\nLine: ${error.lineNumber}`);
        throw error;
    }
}

// Hàm thêm mới bản ghi
async function insert(table, data) {
    const keys = Object.keys(data);
    const columns = keys.join(',');
    const values = keys.map(key => `:${key}`).join(',');
    const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    return await query(sql, data);
}

// Hàm cập nhật bản ghi
async function update(table, data, condition = '') {
    const updates = Object.keys(data).map(key => `${key} = :${key}`).join(',');
    const sql = `UPDATE ${table} SET ${updates}${condition ? ` WHERE ${condition}` : ''}`;
    return await query(sql, data);
}

// Hàm chỉnh sửa một cột bằng CONCAT
async function edit(table, column, data, condition) {
    const sql = `UPDATE ${table} SET ${column} = CONCAT(${column}, ?) WHERE ${condition}`;
    return await query(sql, [data]);
}

// Hàm chỉnh sửa một cột bằng REPLACE
async function editDelete(table, column, data, condition) {
    const sql = `UPDATE ${table} SET ${column} = REPLACE(${column}, ?, "") WHERE ${condition}`;
    return await query(sql, [data]);
}

// Hàm xóa bản ghi
async function deleteRow(table, condition = '') {
    const sql = `DELETE FROM ${table}${condition ? ` WHERE ${condition}` : ''}`;
    return await query(sql);
}

// Lấy nhiều dòng dữ liệu
async function getRaw(sql) {
    const result = await query(sql, [], true);
    return result;
}

// Lấy một dòng dữ liệu
async function oneRaw(sql) {
    const result = await query(sql, [], true);
    return result[0] || null;
}

// Đếm số dòng dữ liệu
async function getRows(sql) {
    const result = await query(sql, [], true);
    return result.length;
}

// Đảm bảo đóng kết nối khi hoàn thành
async function closeConnection() {
    if (conn) await conn.end();
}

module.exports = { insert, update, edit, editDelete, deleteRow, getRaw, oneRaw, getRows, closeConnection };