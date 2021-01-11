import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import React from "react";

export default function MediaCard() {

    return (
        <div className="mx-auto">
            <Card>
            <CardActionArea>
                <CardContent>
                    <Typography variant="body1" component="p" align="left">
                        Show Sub Reddit data
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p" align="left">
                        Show Sub Reddit data
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Sub Reddit /r data
                </Button>
            </CardActions>
        </Card>
        </div>

    );
}
