from fastapi import APIRouter


router = APIRouter()


@router.get("/{player}")
def test_make_car(player: str,text: str):

    with open('api_test/test_img_binary.bin', 'rb') as file:

        url_car_img = 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-y5P3NCasK6owz2i1QKJgoZE4/user-186u1BiO0TtcSyxtmsx4kDoQ/img-ZCC8FVOhwygv6RinNM43AWAb.png?st=2024-03-03T10%3A34%3A39Z&se=2024-03-03T12%3A34%3A39Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-02T13%3A33%3A29Z&ske=2024-03-03T13%3A33%3A29Z&sks=b&skv=2021-08-06&sig=MiyccbiSffSb2Y1hvj%2B7p0RIyjMll4wlrY016bCJnMc%3D'

    
    return {"url_car_img": url_car_img}


