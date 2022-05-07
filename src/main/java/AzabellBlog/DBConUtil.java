package AzabellBlog;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DBConUtil {

	public static Connection getConnection() {
		Connection con = null;
		String driver = "oracle.jdbc.OracleDriver";
		String url= "jdbc:oracle:thin:@127.0.0.1:1521:xe";
		String user="jiwoo2";
		String password= "jiwoo2";
		
		try {
			Class.forName(driver);
			con= DriverManager.getConnection(url, user, password);
		}catch (SQLException | ClassNotFoundException e) {
			//
		}
		return con;
	}
	
	public static void resourceClose(ResultSet rs, PreparedStatement ps, Connection con) {
		if( rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
			}
		}
		if( ps != null) {
			try {
				ps.close();
			} catch (SQLException e) {
			}
		}
		if( con != null) {
			try {
				con.close();
			} catch (SQLException e) {
			}
		}
	}

}
