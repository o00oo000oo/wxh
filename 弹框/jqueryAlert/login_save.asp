
<%
dim url
url = request("url")

'alert内容提示
'response.write("{'type':'alert', 'text':'这是一个alert提示'}")

'简单内容提示
response.write("{'type':'simple', 'text':'这是一个简单提示'}")

'提示后跳转url
'response.write("{'type':'simple', 'cmd':'goto_url', 'text':'这是一个简单提示', 'url':'" & url & "'}")

'提示后跳转url
'response.write("{'type':'alert','cmd':'goto_url','text':'这是一个alert提示','url':'" & url & "'}")

'提示后跳转url
'response.write("{'type':'confirm', 'cmd':'goto_url', 'text':'这是一个确认窗口', 'url':'" & url & "'}")

response.end

%>