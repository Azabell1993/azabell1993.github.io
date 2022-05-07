package AzabellBlog;

public class MemberVO {
//    userID varchar2(20),
//    userPassword varchar2(20) not null,
//    userName varchar2(20) not null,
//    userGender varchar2(20),
//    userEmail varchar2(50),
//    regDate     varchar2(10),
//    lastDate    varchar2(10),
	private String userID;
	private String userPassword;
	private String userName;
	private String userGender;
	private String userEmail;
	private String regDate;
	private String lastDate;
	
	public MemberVO() {
		super();
	}
	//필수 입력사항의 생성자
	public MemberVO(String userID, String userPassword, String userName) {
		super();
		this.userID = userID;
		this.userPassword = userPassword;
		this.userName = userName;	
	}
	
	// 회원 가입시 전체 정보 입력 정보 초기화 생성자
	public MemberVO(String userID, String userPassword, String userName, String userGender, String userEmail,
			String regDate, String lastDate) {
		super();
		this.userID = userID;
		this.userPassword = userPassword;
		this.userName = userName;
		this.userGender = userGender;
		this.userEmail = userEmail;
		this.regDate = regDate;
		this.lastDate = lastDate;
	}
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserGender() {
		return userGender;
	}
	public void setUserGender(String userGender) {
		this.userGender = userGender;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getLastDate() {
		return lastDate;
	}
	public void setLastDate(String lastDate) {
		this.lastDate = lastDate;
	}

	@Override
	public String toString() {
		return "Member [userID=" + userID + ", userPassword=" + userPassword + ", userName=" + userName
				+ ", userGender=" + userGender + ", userEmail=" + userEmail + ", regDate=" + regDate + ", lastDate="
				+ lastDate + "]";
	}
	
	
	
}
