package AzabellBlog;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

//private String userID;
//private String userPassword;
//private String userName;
//private String userGender;
//private String userEmail;
//private String regDate;
//private String lastDate;
public class MemberDAO {

	public int login(String userID, String userPassword) {
		String sql = "select  userPassword from azabellblogtb where userID = ?";
		Connection con = null;
		PreparedStatement ps= null;
		ResultSet rs = null;
		try {
			con = DBConUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1,  userID);
			rs = ps.executeQuery();
			if(rs.next()) {
				if(rs.getString(1).equals(userPassword))
					return 1; //login 성공 
				else
					return 0; //login 실패 
			}
			return -1; // 아이디 없음 
		} catch (Exception e) {
			e.printStackTrace();
		}
		return -2; // 데이터베이스 오류
	}
	

	public int insert(MemberVO vo) {
		int result = 0;
		String sql ="insert into azabellblogtb (userID, userPassword, userName, userEmail, userGender, regdate, lastdate)"
				+ "    values (?, ?, ?, ?, ?, sysdate, sysdate)";
		Connection con = null;
		PreparedStatement ps= null;
		try {
			con = DBConUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, vo.getUserID());
			ps.setString(2,  vo.getUserPassword());
			ps.setString(3, vo.getUserName());
			ps.setString(4, vo.getUserEmail());
			ps.setString(5,  vo.getUserGender());
			result = ps.executeUpdate();
			return result;
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			DBConUtil.resourceClose(null, ps, con);
		}
		return result;
	}
	
	public MemberVO selectOne(String userID) {
		MemberVO resultVO = null;
		StringBuffer sql = new StringBuffer("select userID, userPassword, userName, userGender, userEmail, regdate, lastdate");
			sql.append("    from azabellblogtb");
			sql.append("    where userID = ?");
			Connection con = null;
			PreparedStatement ps = null;
			ResultSet rs = null;
			try {
				con= DBConUtil.getConnection();
				ps = con.prepareStatement(sql.toString());
				ps.setString(1, userID);
				
				rs= ps.executeQuery();
				
				while(rs.next()) {
					resultVO = new MemberVO();
					resultVO.setUserEmail(rs.getString("userEmail"));
					resultVO.setUserID(rs.getString("userID"));
					resultVO.setUserName(rs.getString("userName"));
					resultVO.setUserPassword(rs.getString("userPassword"));
					resultVO.setUserGender(rs.getString("userGender"));
					resultVO.setLastDate(rs.getString("lastDate"));
					resultVO.setRegDate(rs.getString("regDate"));
					return resultVO;
				}
			}catch (SQLException e) {
				// TODO: handle exception
			}finally {
				DBConUtil.resourceClose(rs, ps, con);
			}
		return resultVO;
	}
	
	public int updateOne(MemberVO vo) {
		int result = 0;
		String sql ="update azabellblogtb set userPassword = ?, userName=?, userEmail= ?, userGender=? "
				+ " where userID = ? ";
		Connection con = null;
		PreparedStatement ps= null;
		try {
			con = DBConUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1, vo.getUserPassword());
			ps.setString(2, vo.getUserName());
			ps.setString(3, vo.getUserEmail());
			ps.setString(4, vo.getUserGender());
			ps.setString(5,  vo.getUserID());
			
			result = ps.executeUpdate();
			return result;
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			DBConUtil.resourceClose(null, ps, con);
		}
		return result;
	}
	
	public int lastDateUpdate(String userID) { // 로그인에 성공을 했을 때 자동 호출 되어야 함.(가장 최근 로그인한 날을 기록)
		int result = 0;
		String sql ="update azabellblogtb set lastDate = sysdate  where userID = ?";
		// 주의사항 => vvip의 경우 gradeUp이 안됨
		Connection con = null;
		PreparedStatement ps= null;
		try {
			con = DBConUtil.getConnection();
			ps = con.prepareStatement(sql);
			ps.setString(1,  userID);
			
			result = ps.executeUpdate();
			return result;
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			DBConUtil.resourceClose(null, ps, con);
		}
		return result;
	}
	
	//delete
	//String sql ="delete from azabellblogtb where userID = ?";

	
}
